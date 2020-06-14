import _ from "lodash";

export function mapInTrayArray(notes, history){
  if (!_.isEmpty(notes)) {
    return notes
      .reverse()
      .map(({ content, _id, tags, category }) => {
        if (category === "in-tray") {
          return {
            id: _id,
            history,
            content,
            tags,
            category,
          };
        } else {
          return null;
        }
      })
      .filter((note) => note !== null);
  }
};