import { Steps } from "antd";
import React from "react";

const { Step } = Steps;

interface StepProps {
  title: string;
  description: string;
  subTitle?: string;
}

interface StepsFormProps {
  stepsData: StepProps[];
}

const StepsBlock: React.FC<StepsFormProps> = ({ stepsData }) => (
  <Steps current={0}>
    {stepsData.map((step) => (
      <Step
        title={step.title}
        description={step.description}
        subTitle={step.subTitle}
      />
    ))}
  </Steps>
);

export default StepsBlock;
