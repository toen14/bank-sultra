export const iconName = function (name: string) {
  const userName = name.split(" ");
  const iconName =
    userName[0][0] + (userName.length >= 2 ? userName[1][0] : "");

  return iconName;
};
