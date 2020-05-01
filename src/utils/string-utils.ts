export const generateEmptyInputsErrorMessage = (
  inputs: string[],
) => {
  let errorMessage = "";

  for (
    let index = 0;
    index < inputs.length;
    index += 1
  ) {
    const input = inputs[index];
    errorMessage += input;

    if (index < inputs.length - 2) {
      errorMessage += " , ";
    } else if (index === inputs.length - 2) {
      errorMessage += " or ";
    }
  }

  errorMessage += " is missing";

  return errorMessage;
};
