import SignUpForm from "../../components/auth/SignUpForm";
import PageMeta from "../../components/common/PageMeta";

export default function SignUp() {
  return (
    <>
      <PageMeta title="Sign Up" description="Create a new admin account" />
      <SignUpForm />
    </>
  );
}
