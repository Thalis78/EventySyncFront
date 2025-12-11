import { Header } from "../header";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex justify-center items-center px-4 py-6">
        {children}
      </main>
    </div>
  );
};

export { Layout };
