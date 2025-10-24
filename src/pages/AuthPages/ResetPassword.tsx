import ResetPassForm from "../../components/auth/ResetPassForm";
import PageMeta from "../../components/common/PageMeta";

export default function ResetPassword() {
  return (
    <>
      <PageMeta title="Reset Password" description="Reset your password" />
      <ResetPassForm />
    </>
  );
}
