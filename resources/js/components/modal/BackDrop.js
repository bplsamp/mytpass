
function BackDrop({ children, close }) {
    return (
        <div
            onClick={close}
            className={`p-6 fixed w-full h-full top-0 left-0 z-[99999] bg-[#1f1f1f99] flex justify-center items-center overflow-y-auto`}
        >
            {children}
        </div>
    );
}

export default function BaseModal({ children }) {
    return <BackDrop>{children}</BackDrop>;
}
