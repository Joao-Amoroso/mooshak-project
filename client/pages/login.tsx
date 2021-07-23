import { useRef, useState } from "react";
import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import NextLink from "next/link";
import Wrapper from "../components/Wrapper";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
interface loginProps {}

const login: React.FC<loginProps> = ({}) => {
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const { login } = useAuth()!;

    async function handleSubmit(e: any) {
        e.preventDefault();

        if (emailRef.current == null) {
            return;
        }
        if (passwordRef.current == null) {
            return;
        }
        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);

            if (typeof router.query.next === "string") {
                router.push(router.query.next);
            } else {
                router.push("/");
            }
        } catch (err) {
            setError("User doesn't exist");
        }
        setLoading(false);
    }

    return (
        <Wrapper>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                required
                                ref={emailRef}
                            />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                required
                                ref={passwordRef}
                            />
                        </Form.Group>
                        <Button
                            className="w-100 mt-4"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? (
                                <Spinner animation="border" />
                            ) : (
                                "Log In"
                            )}
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <NextLink href="/forgot-password">
                            Forgot Password?
                        </NextLink>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <NextLink href="/register">Register</NextLink>
            </div>
        </Wrapper>
    );
};

export default login;
