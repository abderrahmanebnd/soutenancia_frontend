import { useParams } from "react-router";

function ProjectOfferDetails() {
  const { idProjectOfferDetails } = useParams();
  return <div>project offer details {idProjectOfferDetails}</div>;
}

export default ProjectOfferDetails;
