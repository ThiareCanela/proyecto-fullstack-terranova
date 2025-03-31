export const calculateDays = (start, end) => {
  if (!start || !end) return 0;
  const startD = new Date(start);
  const endD = new Date(end);
  return Math.max(
    1,
    Math.ceil((endD.getTime() - startD.getTime()) / (1000 * 60 * 60 * 24))
  );
};

export const calculateTotalPrice = (days, pricePerDay) => {
  return days * pricePerDay;
};
