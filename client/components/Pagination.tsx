import React, { useEffect, useState } from "react";
import PaginationBootstrap from "react-bootstrap/Pagination";

interface PaginationProps {
    page: number;
    setPage: (value: React.SetStateAction<number>) => void;
    numPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ setPage, page, numPages }) => {
    const [body, setBody] = useState<Array<JSX.Element> | null>(null);

    useEffect(() => {
        let res = [];
        if (numPages > 8) {
            res.push(
                <PaginationBootstrap.Item
                    key={0}
                    active={0 == page}
                    activeLabel=""
                    onClick={() => setPage(0)}
                >
                    {1}
                </PaginationBootstrap.Item>
            );
            let interval = []; //page == 12
            for (let i = page - 2; i < page + 3; i++) {
                //i=10,11,12,13,14
                if (i <= 0 || i >= numPages - 1) continue;
                interval.push(i);
            }

            if (interval.length != 5) {
                if (interval[0] == 0 || interval[0] == 1) {
                    interval.forEach((i) => {
                        if (i != 0) {
                            res.push(
                                <PaginationBootstrap.Item
                                    key={i}
                                    active={i == page}
                                    activeLabel=""
                                    onClick={() => setPage(i)}
                                >
                                    {i + 1}
                                </PaginationBootstrap.Item>
                            );
                        }
                    });
                    res.push(
                        <PaginationBootstrap.Item key={-102} disabled>
                            ...
                        </PaginationBootstrap.Item>
                    );
                } else {
                    res.push(
                        <PaginationBootstrap.Item key={-105} disabled>
                            ...
                        </PaginationBootstrap.Item>
                    );
                    interval.forEach((i) => {
                        if (i != numPages - 1) {
                            res.push(
                                <PaginationBootstrap.Item
                                    key={i}
                                    active={i == page}
                                    activeLabel=""
                                    onClick={() => setPage(i)}
                                >
                                    {i + 1}
                                </PaginationBootstrap.Item>
                            );
                        }
                    });
                }
            } else {
                if (interval[0] != 1) {
                    res.push(
                        <PaginationBootstrap.Item key={-100} disabled>
                            ...
                        </PaginationBootstrap.Item>
                    );
                }
                interval.forEach((i) => {
                    res.push(
                        <PaginationBootstrap.Item
                            key={i}
                            active={i == page}
                            activeLabel=""
                            onClick={() => setPage(i)}
                        >
                            {i + 1}
                        </PaginationBootstrap.Item>
                    );
                });

                if (interval[4] != numPages - 1) {
                    res.push(
                        <PaginationBootstrap.Item key={-101} disabled>
                            ...
                        </PaginationBootstrap.Item>
                    );
                }
            }

            res.push(
                <PaginationBootstrap.Item
                    key={numPages}
                    active={numPages - 1 == page}
                    activeLabel=""
                    onClick={() => setPage(numPages - 1)}
                >
                    {numPages}
                </PaginationBootstrap.Item>
            );
        } else {
            for (let i = 0; i < numPages; i++) {
                res.push(
                    <PaginationBootstrap.Item
                        key={i}
                        active={i == page}
                        activeLabel=""
                        onClick={() => setPage(i)}
                    >
                        {i + 1}
                    </PaginationBootstrap.Item>
                );
            }
        }
        setBody(res);
    }, [page, numPages]);

    return (
        <PaginationBootstrap className="w-100 d-flex justify-content-end">
            {body}
            {/* <PaginationBootstrap.Item onClick={() => setPage(1)}>
                {1}
            </PaginationBootstrap.Item>
            <PaginationBootstrap.Item disabled>...</PaginationBootstrap.Item>

            <PaginationBootstrap.Item>{10}</PaginationBootstrap.Item>
            <PaginationBootstrap.Item>{11}</PaginationBootstrap.Item>
            <PaginationBootstrap.Item active>{12}</PaginationBootstrap.Item>
            <PaginationBootstrap.Item>{13}</PaginationBootstrap.Item>
            <PaginationBootstrap.Item disabled>{14}</PaginationBootstrap.Item>

            <PaginationBootstrap.Item disabled>...</PaginationBootstrap.Item>
            <PaginationBootstrap.Item>{numPages}</PaginationBootstrap.Item> */}
        </PaginationBootstrap>
    );
};

export default Pagination;
