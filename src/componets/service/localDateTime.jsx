
// GET DATE TIME
export const localDate = (date) => {   
    const createDate = new Date(date+'+00:00')
    return formatDateTime(createDate)
}

//// POST DATE TIME
export const offsetTimeTOUTC = (data_time) => {
    if (!data_time) {return null}
    let indate = new Date(data_time)
    let d = indate.toISOString()
    return  d.substring(':', d.length - 8)
}

export const formatDateTime = (data_time = Date.now()) => {
    let d = new Date(data_time);
    var datestring = d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    ("0" + d.getDate()).slice(-2) + "T" + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    return datestring
}