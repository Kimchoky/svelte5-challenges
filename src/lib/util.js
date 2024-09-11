/**
 * Build a formmated date string with given parameters.
 * @param {Date|string} [time=new Date()] - time to calculate from
 * @param {string} [offset='0D'] - 1D: tommorow, -2M: 2 months earlier, etc...
 * @param {string|null} [format='YYYY-MM-DD'] - format string
 * @param {boolean} [useUTC=true] - use UTC time when true, local time when false.
 * @returns formmated date string
 */
export function getFormattedDate(time = new Date(), offset = '0D', format = 'YYYY-MM-DD', useUTC = true) {
    let date;
    if (time instanceof Date) {
        date = new Date(time);
    } else if (typeof time === 'string') {
        date = new Date(time);
    } else {
        throw new Error('Invalid time parameter. Must be a Date object or a valid date string.');
    }
    if (!format) format = 'YYYY-MM-DD';
    
    // offset
    const unit = offset.slice(-1);  // last word should be (D, M, Y)
    const value = parseInt(offset.slice(0, -1), 10) || 0;  // get number part. 0 if not exists.

    switch (unit) {
        case 'D':
            date.setDate(date.getDate() + value);
            break;
        case 'M':
            date.setMonth(date.getMonth() + value);
            break;
        case 'Y':
            date.setFullYear(date.getFullYear() + value);
            break;
        default:
            break;
    }

    // extract date
    const year = useUTC ? date.getUTCFullYear() : date.getFullYear();
    const month = String(useUTC ? date.getUTCMonth() + 1 : date.getMonth() + 1).padStart(2, '0');
    const day = String(useUTC ? date.getUTCDate() : date.getDate()).padStart(2, '0');
    
    // formatting
    const formattedDate = format
        .replace('YYYY', ''+year)
        .replace('MM', month)
        .replace('DD', day);
    
    return formattedDate;
}


/**
 * Convert a UTC date string to local time and return the date and time parts separately.
 * 
 * @param {string} utcString - UTC date string to convert (ex: '2024-09-09T12:00:00Z')
 * @returns {{ date: string, time: string }} converted local date and time string
 * @example
 * const utcString = '2024-09-09T12:00:00Z';
 * const localDateTime = convertUTCToLocal(utcString);
 * console.log(localDateTime.date);  // local date: '2024-09-09'
 * console.log(localDateTime.time);  // local time: '12:00:00'
 */
export function convertUTCToLocal(utcString) {
    // convert UTC string to Date
    const utcDate = new Date(utcString);

    // local date format (YYYY-MM-DD)
    const year = utcDate.getFullYear();
    const month = String(utcDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(utcDate.getDate()).padStart(2, '0');

    // local time format (HH:mm:ss)
    const hours = String(utcDate.getHours()).padStart(2, '0');
    const minutes = String(utcDate.getMinutes()).padStart(2, '0');
    const seconds = String(utcDate.getSeconds()).padStart(2, '0');

    return {
        date: `${year}-${month}-${day}`,
        time: `${hours}:${minutes}:${seconds}`
    };
}

/**@type { (celsius:number|null)=>number|null }*/
export function convertToFahrenheit(celsius) {
    if (celsius === null) return null;

    const fixedLength = ((''+celsius).split('.')[1] ?? '').length;

    return Number((celsius * 9 / 5 + 32).toFixed(fixedLength));
}


/**
 * @param {number} start  
 * @param {number} end 
 */
export function* rangeGenerator(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}
