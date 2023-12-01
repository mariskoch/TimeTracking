import { TimeHoursMinutes as TimeHoursMinutes } from "./DateUtils";
import ExportTableSchema from "./ExportTableSchema";

export default class ExportTableBuilder {
    public static build(firstName: string, lastName: string, data: ExportTableSchema[]): JSX.Element {
        const year = data[0].day.getFullYear();
        const month = data[0].day.getMonth() + 1;
        const element = (
            <div className="bg-white w-[794px] h-[1123px] p-0">
                <div className="grid grid-cols-2">
                    <div>
                        First Name:
                    </div>
                    <div>
                        {firstName}
                    </div>
                    <div>
                        Last Name:
                    </div>
                    <div>
                        {lastName}
                    </div>
                    <div>
                        Year:
                    </div>
                    <div>
                        {year}
                    </div>
                    <div>
                        Month:
                    </div>
                    <div>
                        {month}
                    </div>
                </div>
                <table>
                    <thead>
                        <th>Date</th>
                        <th>Weekday</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Pause Duration</th>
                    </thead>
                    <tbody>
                        {data.map((rowData, index) => {
                            return (
                                <tr key={index}>
                                    <td>{rowData.day.getDate()}</td>
                                    <td>{rowData.weekday}</td>
                                    <td>{TimeHoursMinutes(rowData.startTime)}</td>
                                    <td>{TimeHoursMinutes(rowData.endTime)}</td>
                                    <td>{TimeHoursMinutes(rowData.pauseDuration)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
        return (element);
    }
}
