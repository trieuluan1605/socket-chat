import dynamic from "next/dynamic";

const NoSsr = (Component: any) =>
  dynamic(() => Promise.resolve(Component), { ssr: false });

export default NoSsr;
