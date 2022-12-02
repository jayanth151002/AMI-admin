const actions = {
  CONNECT: { url: "/", method: "get" },
  GETCAMS: { url: "/get-nearest-cameras", method: "post" },
  GETLOGS: { url: "/get-logs", method: "get" },
  GETCAM: { url: "/get-cameras", method: "get" },
};

export default actions;
