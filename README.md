# FlexTool

Platform for building internal tools

Project is build using the create-react-app cli and being deployed over [Vercel](https://vercel.com/)

[Demo](https://flextool.vercel.app/) is also available

## Project Local Build Instructions

Make sure you've [`git`](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), [`yarn`](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) & [`nodejs`](https://nodejs.org/en/) installed in your system.

Open terminal and follow these steps;

- Step 1: Clone the repo.

```bash
git clone https://github.com/ekas/flextool
```

You should now see a `flextool` folder in your present working directory. Let's change directory to it.

```bash
cd flextool/
```

- Step 2: Frontend Build Instructions. Install dependencies.

```bash
cd frontend/
yarn install
```

This will use `yarn` to install project dependencies.

- Step 3: Start the frontend project.

```bash
yarn start
```

This will run a local instance of the application `http://localhost:3000/`

- Step 4: Backend Build Instructions. Install dependencies.

Open a new terminal and enter following command.

```bash
cd backend2/
npm install
```

- Step 4: Start the backend project.

```bash
npm run start:dev
```

This will run a local backend instance of the application `http://localhost:5000/`. If you change the backend port don't forget to update the `.env` file in the frontend folder

## Project e2e test Instructions

- Step 1: Restart both frontend and backend servers as per instructions in above sections.
- Step 2: For Visual e2e test.

```bash
cd frontend/
yarn run cypress:open
```

- Step 3: Click on `E2E Testing` and then chose a browser and click on start E2E testing button.

![Img 1]()

## Project Screenshots

## Thank You
