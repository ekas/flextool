import { FC, useEffect, useState } from "react";
import { Avatar, Button, Comment, Form, Input, List, Tooltip } from "antd";
import moment from "moment";
import { UserOutlined, DeleteTwoTone } from "@ant-design/icons";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  ADD_COMMENT,
  DELETE_COMMENT,
  GET_PAGE_COMMENTS,
} from "queries/comment.query";
import { toast } from "react-toastify";
import CommentBaseItem from "types/comment.type";
import { User } from "types/user.type";

const { TextArea } = Input;

interface CommentItem {
  id: string;
  userid: string;
  author: string;
  avatar: JSX.Element;
  content: React.ReactNode;
  datetime: string;
}

interface EditorProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  submitting: boolean;
  value: string;
}

const actions = (
  comment: CommentItem,
  userId: string | undefined | null,
  deleteComment: (commentId: string) => void
) => [
  comment.userid === userId && (
    <Tooltip key="comment-delete" title="Delete">
      <span onClick={() => deleteComment(comment.id)}>
        <DeleteTwoTone />
      </span>
    </Tooltip>
  ),
];

const CommentList = ({
  comments,
  deleteComment,
  userId,
}: {
  userId: string | undefined | null;
  comments: CommentItem[];
  deleteComment: (commentId: string) => void;
}) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
    itemLayout="horizontal"
    renderItem={(comment) => (
      <Comment {...comment} actions={actions(comment, userId, deleteComment)} />
    )}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }: EditorProps) => (
  <>
    <Form.Item>
      <TextArea rows={2} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);

interface CustomCommentProps {
  pageId?: string;
  userData?: User;
}

const CustomComment: FC<CustomCommentProps> = ({ pageId, userData }) => {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");

  const [getPageComments] = useLazyQuery(GET_PAGE_COMMENTS, {
    onCompleted: (QueryData) => {
      setComments([
        ...comments,
        ...QueryData.getPageComments.map((comment: CommentBaseItem) =>
          changeCommentObject(comment)
        ),
      ]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [addComment] = useMutation(ADD_COMMENT, {
    onCompleted: (QueryData) => {
      const {
        id,
        text,
        updatedAt,
        userId,
        user: { firstName, lastName },
      } = QueryData.addComment;
      toast.success(`${firstName} ${lastName} Added Comment`);
      setComments([
        ...comments,
        {
          id: id,
          userid: userId,
          author: `${firstName} ${lastName}`,
          avatar: (
            <Avatar icon={<UserOutlined />} alt={`${firstName} ${lastName}`} />
          ),
          content: <p>{text}</p>,
          datetime: moment(updatedAt).fromNow(),
        },
      ]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [deleteComment] = useMutation(DELETE_COMMENT, {
    onCompleted: (QueryData) => {
      const { id } = QueryData.deleteComment;
      toast.success(`Comment Deleted`);
      setComments([
        ...comments.filter((comment: CommentItem) => comment.id !== id),
      ]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const changeCommentObject = (comment: CommentBaseItem): CommentItem => {
    const {
      id,
      text,
      updatedAt,
      userId,
      user: { firstName, lastName },
    } = comment;
    return {
      id,
      userid: userId,
      author: `${firstName} ${lastName}`,
      avatar: (
        <Avatar icon={<UserOutlined />} alt={`${firstName} ${lastName}`} />
      ),
      content: <p>{text}</p>,
      datetime: moment(updatedAt).fromNow(),
    };
  };

  useEffect(() => {
    if (pageId) {
      getPageComments({ variables: { pageId } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = () => {
    if (!value) return;
    setSubmitting(true);
    addComment({ variables: { pageId, text: value } });
    setTimeout(() => {
      setSubmitting(false);
      setValue("");
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      {comments.length > 0 && (
        <CommentList
          userId={userData !== undefined ? userData.id : undefined}
          comments={comments}
          deleteComment={(commentId: string) =>
            deleteComment({ variables: { id: commentId } })
          }
        />
      )}
      <Comment
        avatar={<Avatar size={35} icon={<UserOutlined />} />}
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
    </>
  );
};

export default CustomComment;
