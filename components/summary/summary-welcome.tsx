const SummaryWelcome: React.FC = () => {
  return (
    <div className="card-wrapper h-[180px] w-[180px] m-auto ">
      <div
        className="card-content flex items-center justify-center text-center p-2"
        style={{
          height: 'calc(100% - 4px)',
          width: 'calc(100% - 4px)',
          top: '2px',
          left: '2px',
        }}
      >
        <p>
          upload{' '}
          <code className="px-2 bg-gray-100 dark:bg-gray-800 rounded">
            .srt
          </code>{' '}
          or{' '}
          <code className="px-2 bg-gray-100 dark:bg-gray-800 rounded">
            .txt
          </code>{' '}
          file to generate a summary
        </p>
      </div>
    </div>
  );
};

export default SummaryWelcome;
