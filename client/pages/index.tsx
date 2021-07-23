import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useIsAuth } from "../utils/useIsAuth";
import { Navbar, Button, Container, Form, Row, Col } from "react-bootstrap";
import Table from "../components/Table";
import { useState, useRef, useEffect } from "react";
import { tableData } from "../types/tableData";
import OrderBy from "../utils/OrderBy";
import { useSocket } from "../context/SocketContext";

export default function Home() {
    const { currentUser, logout } = useAuth()!;
    const { socket } = useSocket()!;
    const router = useRouter();
    const [onlyMeChecked, setOnlyMeChecked] = useState(false);
    const [name, setName] = useState<string>("");
    const [displayedData, setDisplayedData] = useState<tableData[]>(
        OrderBy["DateDesc"](dataValues)
    );

    useIsAuth();

    function doSomething() {
        console.log(currentUser);
        currentUser?.getIdToken().then((id) => {
            console.log(id);
            console.log(socket);
            if (socket) {
                socket.emit("mtk", id);
                console.log("aqwui");
            }
        });
    }

    async function handleLogout() {
        try {
            await logout();
            router.push("/login");
        } catch (err) {
            alert(err.message);
        }
    }

    function handleNameSearch(e: any) {
        const name = e.target.value;
        setName(name);
    }

    return (
        <div
            style={{ minHeight: "100vh", width: "100vw" }}
            className="d-flex flex-column"
        >
            <Navbar variant="dark" bg="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Mooshak</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Button
                            variant="outline-success"
                            className="mr-4"
                            onClick={doSomething}
                        >
                            Icon
                        </Button>
                        <Button variant="link" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container
                className="mt-4 d-flex align-items-center flex-column flex-grow-1 justify-content-center"
                style={{ height: "100%" }}
            >
                <Form className="mb-3 w-75">
                    <Row>
                        <Col>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check
                                    type="checkbox"
                                    label="Only me"
                                    onChange={(e) =>
                                        setOnlyMeChecked((prev) => !prev)
                                    }
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Row>
                                    <Col sm={3}>
                                        <Form.Label>Name</Form.Label>
                                    </Col>
                                    <Col md="auto">
                                        <Form.Control
                                            type="text"
                                            size="sm"
                                            onChange={handleNameSearch}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Row>
                                    <Col sm={4}>
                                        <Form.Label>Order By</Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            as="select"
                                            size="sm"
                                            onChange={(e) => {
                                                setDisplayedData((prevData) => {
                                                    const newData =
                                                        OrderBy[
                                                            e.target.value.toString()
                                                        ](prevData);
                                                    console.log(newData);
                                                    return newData;
                                                });
                                            }}
                                        >
                                            {Object.keys(OrderBy).map((key) => {
                                                return (
                                                    <option
                                                        key={key}
                                                        value={key}
                                                    >
                                                        {key
                                                            .match(
                                                                /[A-Z][a-z]+/g
                                                            )
                                                            ?.join(" ")}
                                                    </option>
                                                );
                                            })}
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
                <Table
                    data={
                        onlyMeChecked
                            ? displayedData.filter(
                                  (d) => d.user === currentUser?.displayName
                              )
                            : displayedData.filter((d) => {
                                  return d.user.includes(name);
                              })
                    }
                    limit={8}
                />
            </Container>
        </div>
    );
}

const dataValues = [
    {
        id: "f3e1290b-19d5-4a0f-98bd-91ad1a439d1b",
        user: "kcleaveland0",
        uploadAt: "1605622096000",
        time: 717,
        tests: {
            passed: 43,
            testsFailed: []
        }
    },
    {
        id: "42130e97-c143-4230-a766-e76cda6be81e",
        user: "ksaggs1",
        uploadAt: "1602636371000",
        time: 509,
        tests: {
            passed: 3,
            testsFailed: [
                "Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.",
                "Nulla tempus.",
                "Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl.",
                "Etiam justo."
            ]
        }
    },
    {
        id: "ce8ad3e8-6c80-49d1-b297-f633fbd24ed4",
        user: "joao",
        uploadAt: "1616981030000",
        time: 518,
        tests: {
            passed: 64,
            testsFailed: [
                "Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi.",
                "Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros.",
                "Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.",
                "Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam. Nam tristique tortor eu pede."
            ]
        }
    },
    {
        id: "d2fe4d42-4449-4cfd-9bfc-31530b617304",
        user: "bmacgoun3",
        uploadAt: "1604477488000",
        time: 712,
        tests: {
            passed: 12,
            testsFailed: [
                "Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat.",
                "Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
                "Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti.",
                "Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat."
            ]
        }
    },
    {
        id: "8c9b9fbb-b322-4438-ac40-64335a06024d",
        user: "lwestcar4",
        uploadAt: "1611630349000",
        time: 521,
        tests: {
            passed: 31,
            testsFailed: [
                "Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio.",
                "Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
                "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices.",
                "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est."
            ]
        }
    },
    {
        id: "a49a00f3-1c9f-47ae-9f5c-b27be5ee7b4f",
        user: "ghlavecek5",
        uploadAt: "1597308920000",
        time: 750,
        tests: {
            passed: 16,
            testsFailed: [
                "Integer a nibh.",
                "Vestibulum sed magna at nunc commodo placerat. Praesent blandit.",
                "Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi.",
                "Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus."
            ]
        }
    },
    {
        id: "5a3322df-e5c0-441b-a774-bdfc39ebb0aa",
        user: "tmattityahou6",
        uploadAt: "1608691409000",
        time: 357,
        tests: {
            passed: 97,
            testsFailed: [
                "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus."
            ]
        }
    },
    {
        id: "22278be8-e095-4dbd-8964-d311e066b49b",
        user: "gwinman7",
        uploadAt: "1609045426000",
        time: 504,
        tests: {
            passed: 92,
            testsFailed: []
        }
    },
    {
        id: "9caa556e-4e55-4520-b748-e49911d10949",
        user: "molrenshaw8",
        uploadAt: "1616987439000",
        time: 355,
        tests: {
            passed: 47,
            testsFailed: [
                "Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus.",
                "Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
                "Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
                "In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna."
            ]
        }
    },
    {
        id: "c851bfdb-9330-46e9-b022-0700c948cccf",
        user: "goddie9",
        uploadAt: "1612237927000",
        time: 962,
        tests: {
            passed: 14,
            testsFailed: [
                "Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.",
                "Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet."
            ]
        }
    },
    {
        id: "79ba8d17-5252-457c-9224-3a43893f0641",
        user: "mfilppettia",
        uploadAt: "1614057339000",
        time: 186,
        tests: {
            passed: 46,
            testsFailed: [
                "Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
                "Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst."
            ]
        }
    },
    {
        id: "0f9c374b-4942-4b1a-8db5-7245239cc650",
        user: "rturoneb",
        uploadAt: "1611320754000",
        time: 308,
        tests: {
            passed: 9,
            testsFailed: [
                "Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros."
            ]
        }
    },
    {
        id: "b69ea7ef-78bf-4480-89c8-1c31f0ea3d59",
        user: "jroebuckc",
        uploadAt: "1613590318000",
        time: 41,
        tests: {
            passed: 63,
            testsFailed: [
                "Curabitur gravida nisi at nibh.",
                "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
                "Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat."
            ]
        }
    },
    {
        id: "359b2f39-ac73-4b9a-9619-a2cf1ced8ea0",
        user: "kleishmand",
        uploadAt: "1615782682000",
        time: 301,
        tests: {
            passed: 36,
            testsFailed: [
                "Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
                "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum."
            ]
        }
    },
    {
        id: "706c75db-f372-4bb1-994c-9acda7a369d5",
        user: "joao",
        uploadAt: "1596061834000",
        time: 98,
        tests: {
            passed: 90,
            testsFailed: [
                "In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst."
            ]
        }
    }
];
