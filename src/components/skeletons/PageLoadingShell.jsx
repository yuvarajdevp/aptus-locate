import Header from "@/layout/Header";
import Footer from "@/layout/Footer";

export default function PageLoadingShell({ children }) {
    return (
        <div className="pb-24 md:pb-0">
            <Header />
            {children}
            <Footer aboutDetails={{}} />
        </div>
    );
}
