const socket = async (ctx, next) => {
  console.log(ctx);
  ctx.body = 'hello word';
};

module.exports = socket;
