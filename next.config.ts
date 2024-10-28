module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
    ];
  },
};
