const getSafeArray = (value: any) => (Array.isArray(value) ? value : [value]);

export default getSafeArray;
