import Link from "next/link";

const Signup = () => {
    return (
        <div>
            <h1>Signup</h1>
            <Link href="/login" aria-label="login">
                Already have an account? Login
            </Link>
        </div>
    );
};

export default Signup;
