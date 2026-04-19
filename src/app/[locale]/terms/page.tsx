import TermsView from "@/components/public/views/terms/Terms";

interface Props {
    searchParams: { for: string };
}
export default async function Terms({ searchParams }: Props) {
    const forValue = (await searchParams).for
    return (
        <>
            <TermsView accountType={forValue} />
        </>
    )
}