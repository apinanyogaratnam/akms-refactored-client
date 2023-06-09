const Footer = () => {
    return (
        <footer className="bg-gray-100">
            <div className="h-[50px]"></div>
            <div className="mx-auto w-[70%]">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                        <h1 className="text-lg font-semibold">AKMS</h1>
                        {/* <p className="w-[30%]">Build powerful live experiences in your product with Dyte's video and voice SDKs.</p>
                    <div>
                        <span>Green •</span>
                        All systems operational
                    </div> */}
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-lg font-semibold">Product</h1>
                        <div>Video SDK</div>
                        <div>Plugin SDK</div>
                        <div>Pricing</div>
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold">Developers</h1>
                        <div>Developer Portal</div>
                        <div>Documentation</div>
                        <div>API Reference</div>
                        <div>Sample Apps</div>
                        <div>Guides</div>
                        <div>Support</div>
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold">Company</h1>
                        <div>Blog</div>
                        <div className="flex flex-row items-center space-x-2">
                            <h1>Careers</h1>
                            <span className="rounded-md bg-blue-200 p-2 text-blue-700">{"We're hiring"}</span>
                        </div>
                        <div>Community</div>
                        <div>Contact Us</div>
                        <div>FAQs</div>
                    </div>
                </div>
                <div className="mt-10 flex flex-row justify-between">
                    <div>socials</div>
                    <div>Terms of service • Privacy policy • Website Terms of Use</div>
                    <div>
                        <div>&copy; 2021 AKMS, Inc. All rights reserved.</div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
