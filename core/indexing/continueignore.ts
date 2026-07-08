import fs from "fs";
import { IDE } from "..";
import { getGlobalArclengthContinuationIgnorePath } from "../util/paths";
import { gitIgArrayFromFile } from "./ignore";

export const getGlobalArclengthContinuationIgArray = () => {
  const contents = fs.readFileSync(
    getGlobalArclengthContinuationIgnorePath(),
    "utf8",
  );
  return gitIgArrayFromFile(contents);
};

export const getWorkspaceArclengthContinuationIgArray = async (ide: IDE) => {
  const dirs = await ide.getWorkspaceDirs();
  return await dirs.reduce(
    async (accPromise, dir) => {
      const acc = await accPromise;
      try {
        const contents = await ide.readFile(`${dir}/.continueignore`);
        return [...acc, ...gitIgArrayFromFile(contents)];
      } catch (err) {
        console.error(err);
        return acc;
      }
    },
    Promise.resolve([] as string[]),
  );
};
