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
        formattedValue = `0${value[0]}:${value[1]}${value[2]}`;
    } else if (length === 4) {
        formattedValue = `${value[0]}${value[1]}:${value[2]}${value[3]}`;
    }

    return formattedValue;
}