// generate mock token for new user
export const tokenizer = () => ((Math.random() * 10000000).toString(32) + (Math.random() * 10000000).toString(32));