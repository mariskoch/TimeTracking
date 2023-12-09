export function formatTime(value: string): string {
    const length = value.length;
    let formattedValue = '';
    if (length === 1) {
        formattedValue = `0${value}:00`;
    } else if (length === 2) {
        if (parseInt(value) <= 23) {
            formattedValue = `${value}:00`;
        } else if (parseInt(value) > 23 && parseInt(value) < 60) {
            formattedValue = `00:${value}`;
        } else {
            formattedValue = `00:00`;
        }
    } else if (length === 3) {
        const lastTwoDigits = parseInt(value.slice(1));
        if (lastTwoDigits <= 59) {
            formattedValue = `0${value[0]}:${value[1]}${value[2]}`;
        } else {
            formattedValue = `0${value[0]}:00`;
        }
    } else if (length === 4) {
        const lastTwoDigits = parseInt(value.slice(2));
        if (lastTwoDigits <= 59) {
            formattedValue = `${value[0]}${value[1]}:${value[2]}${value[3]}`;
        } else {
            formattedValue = `${value[0]}${value[1]}:00`;
        }
    }

    return formattedValue;
}