export type ActivityType = {
    activityType: any;
    emission: number;
    map(arg0: (activity: { value: number; carbon_emission: number; name: string; }) => { value: number; name: string; }): unknown;
    id: number;
    name: string;
    color: string;
    icon: string;
    carbon_emission: number;
}