import { Grid } from "react-loader-spinner";
export default function Loader() {
  return (
    <div>
      <Grid
        visible={true}
        height="100"
        width="100"
        color="#5a1509"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass="grid-wrapper"
      />
    </div>
  );
}
