import { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import NextLink from "next/link";
import Wrapper from "../components/Wrapper";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
interface registerProps {}

const register: React.FC<registerProps> = ({}) => {
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);
    const { register } = useAuth()!;

    async function handleSubmit(e: any) {
        e.preventDefault();

        if (emailRef.current == null) {
            return;
        }
        if (passwordRef.current == null) {
            return;
        }
        if (passwordConfirmRef.current == null) {
            return;
        }

        if (passwordConfirmRef.current.value !== passwordRef.current.value) {
            return setError("Passwords not match");
        }

        if (passwordRef.current.value.length < 6) {
            return setError("Password should be at least 6 characters");
        }

        try {
            setError("");
            setLoading(true);
            await register(emailRef.current.value, passwordRef.current.value);
            router.push("/");
        } catch (err) {
            console.log("err: ", err);
            setError(err.message);
        }
        setLoading(false);
    }

    return (
        <Wrapper>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Register</h2>
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
                        <Form.Group controlId="passwordConfirm">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                required
                                ref={passwordConfirmRef}
                            />
                        </Form.Group>
                        <Button
                            className="w-100 mt-4"
                            type="submit"
                            disabled={loading}
                        >
                            Register
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account?
                <NextLink href="/login">Log in</NextLink>
            </div>
        </Wrapper>
    );
};

export default register;
