const TimeDifference = (dt2: Date, dt1: Date): number => {
    const diff = (dt2.getTime() - dt1.getTime()) / 1000;
    return Math.abs(Math.round(diff / 60));
}

export default TimeDifference;
