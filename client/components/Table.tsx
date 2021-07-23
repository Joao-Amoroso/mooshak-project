import React, { useState, useEffect, useMemo } from "react";
import { Table as BootstrapTable } from "react-bootstrap";
import { tableData } from "../types/tableData";
import Pagination from "./Pagination";

interface TableProps {
    data: tableData[];
    limit: number;
}

const Table: React.FC<TableProps> = ({ data, limit }) => {
    const [page, setPage] = useState<number>(0);
    const [body, setBody] = useState<Array<JSX.Element> | null>(null);
    const numPages = useMemo(() => {
        let len = data.length;
        let res = Math.floor(len / limit);
        if (len % limit != 0) res += 1;

        if (page > res) setPage(0);
        return res;
    }, [data, limit]);

    useEffect(() => {
        setBody(renderBody());
    }, [data, page]);

    function renderBody(): Array<JSX.Element> | null {
        console.log("entrei aqui:", page);
        if (data == null) return null;
        let res = [];

        const limitSup = Math.min(limit * (page + 1), data.length);

        for (let i = 0 + limit * page; i < limitSup; i++) {
            const row = data[i];
            const uploadDataToString = dateToStringInTable(
                new Date(parseInt(row.uploadAt))
            );
            const minutes = Math.floor(row.time / 60);
            const seconds = row.time - minutes * 60;
            const passedOrNot =
                row.tests.testsFailed.length === 0
                    ? "text-success table-success"
                    : "text-danger table-danger ";
            /*res.push(
                <tr key={row.id}>
                    <td>{row.user}</td>
                    <td>{uploadDataToString}</td>
                    <td>{`${minutes}min ${seconds}s`}</td>
                    <td className={passedOrNot}>{row.tests.passed}</td>
                </tr>
            );*/

            if (row.tests.testsFailed.length === 0) {
                res.push(
                    <tr key={row.id} className="table-success">
                        <td>{row.user}</td>
                        <td>{uploadDataToString}</td>
                        <td>{`${minutes}min ${seconds}s`}</td>
                        <td className={passedOrNot}>{row.tests.passed}</td>
                    </tr>
                );
            } else {
                res.push(
                    <tr key={row.id}>
                        <td>{row.user}</td>
                        <td>{uploadDataToString}</td>
                        <td>{`${minutes}min ${seconds}s`}</td>
                        <td className={passedOrNot}>{row.tests.passed}</td>
                    </tr>
                );
            }
        }

        return res;
    }

    return (
        <>
            <BootstrapTable striped bordered hover>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Data de submissao</th>
                        <th>Tempo (min/s)</th>
                        <th style={{ whiteSpace: "nowrap", width: "1%" }}>
                            Tests Passed
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {body}
                    {/* {data?.map((row, index) => {
                    if (index > limit) return;
                    const uploadDataToString = dateToStringInTable(
                        new Date(parseInt(row.uploadAt))
                    );
                    const minutes = Math.floor(row.time / 60);
                    const seconds = row.time - minutes * 60;
                    const passedOrNot =
                        row.tests.testsFailed.length === 0
                            ? "text-success table-success"
                            : "text-danger table-danger ";

                    return (
                        <tr key={row.id}>
                            <td>{row.user}</td>
                            <td>{uploadDataToString}</td>
                            <td>{`${minutes}min${seconds}s`}</td>
                            <td className={passedOrNot}>{row.tests.passed}</td>
                        </tr>
                    );
                })} */}
                </tbody>
            </BootstrapTable>
            <Pagination page={page} setPage={setPage} numPages={numPages} />
        </>
    );
};

function dateToStringInTable(date: Date): string {
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - ${date.getDate()}/${
        date.getMonth() + 1
    }/${date.getFullYear()}`;
}

export default Table;
