import regression from 'regression';

export const calculateRegression = (formattedData) => {
  let regressionData = [];
  regressionData = formattedData.map((element) => [Date.parse(element.x), element.y]);
  const result = regression.linear(regressionData);
  const gradient = result.equation[0];
  const yIntercept = result.equation[1];
  const prediction = result.predict(2);
  regressionData = result.points.map((element) => {
    return {
      x: element[0],
      y: element[1],
    };
  });

  return { regressionData, gradient, yIntercept, prediction };
};

export const prepareData = (dataSet) => {
  let preparedData = dataSet.map((data) => ({
    x: data.date,
    y: data.amount,
  }));
  return preparedData;
};
