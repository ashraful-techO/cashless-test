import { Header } from "@/components/organism";
import { Poppins } from "next/font/google";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/globals.css";
import { ReduxProvider } from "../context";
import NextAuthProvider from "../context/NextAuthProvider";

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<NextAuthProvider>
				<ReduxProvider>
					<body className={poppins.className}>
						<div className="sticky top-0 z-30">
							<Header />
						</div>

						<main>
							<div className="p-2 w-full">
								<div>{children}</div>
							</div>
						</main>
						<ToastContainer />
					</body>
				</ReduxProvider>
			</NextAuthProvider>
		</html>
	);
}
