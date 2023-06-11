const validateField = {
  testFields: (name: string): any => {
    const result = name.match(/[0-9A-Za-zÄÖÜäöü -.,!?]/g);
    if (result!.length === name.length) {
      return true;
    }
    return false;
  },
  testName: (name: string) => {
    const result = name.match(/[A-Za-zÄÖÜäöü -]/g);
    if (result?.length === name.length) {
      return true;
    }
    return false;
  },
};

export default validateField;
