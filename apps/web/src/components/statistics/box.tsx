
type BoxProps = {
    title: string;
    content: string;
    subtitle: string;
};

export const Box = ({title, content, subtitle}: BoxProps) => {
    return (
        <div className="bg-white overflow-hidden shadow rounded-lg p-5">
            <h2 className="text-sm font-medium text-gray-500 truncate">{title}</h2>
            <p className="mt-1 text-3xl font-semibold text-gray-900">{content}</p>
            <h3 className="mt-1 text-sm text-gray-500">{subtitle}</h3>
        </div>
    );
};
