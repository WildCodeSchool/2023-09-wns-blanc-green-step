export type Expense = {
  activityType: {
    id: number;
    name: string;
    icon: string;
  };
  date: string;
  emission: number;
  id: number;
  title: string;
};
