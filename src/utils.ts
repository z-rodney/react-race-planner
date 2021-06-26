import { IStage } from './types';

export const getDateAndDuration: (arg: IStage[]) => { date: string, duration: string } = (arr: IStage[]) => {
    if (arr.length === 1) {
      return { date: arr[0].date, duration: '1 day' }
    } else {
      const [race1, race2] = arr;
      const date1 = new Date(race1.date).getTime();
      const date2 = new Date(race2.date).getTime();
      const dateDifference = Math.abs(date2 - date1);
      const durationNum = Math.ceil(dateDifference / 86400000) + 1
      const duration = `${durationNum} days`
      return {date: race1.date, duration}
    }
  }
