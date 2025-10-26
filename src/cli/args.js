const parseArgs = () => {
  const args = process.argv.slice(2);

  const parsedArgs = args.reduce((acc, _, i, arr) => {
    if (i % 2 === 0) {
      const [key, value] = [arr[i].replace(/^--/, ''), arr[i + 1] || ''];
      acc.push(`${key} is ${value}`);
    }
    return acc;
  }, []).join(', ');

  console.log(parsedArgs);
};

parseArgs();
