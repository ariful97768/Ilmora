export default function LoadingUi() {
  return (
    <div className="flex justify-center items-center ">
      loading...
      <div className="w-20 h-20 rounded-full border-2 border-black border-t-transparent animate-spin duration-300"></div>
    </div>
  );
}
