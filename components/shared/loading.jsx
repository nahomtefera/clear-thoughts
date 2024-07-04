export default function Loading({text="Loading", color="#000000", width=16, border=4, height=16, noText}) {
    return(
        <div className="flex min-h-screen items-center justify-center flex-col gap-8">
            <div className={`h-${height} w-${width} animate-spin rounded-full border-4 border-[#d3ebff] border-t-transparent`}/>
        </div>
    )
}
