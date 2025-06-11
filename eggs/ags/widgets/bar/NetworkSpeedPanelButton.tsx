import networkSpeed from "../../utils/networkspeed";
import PanelButton from "../common/PanelButton";

export default function NetworkSpeedPanelButton() {
	return (
		<PanelButton window="">
			<box vertical cssClasses={["network-speed"]}>
				{networkSpeed((value) => {
					const downloadSpeed = value.download;
					const uploadSpeed = value.upload;
					const higherSpeed =
						downloadSpeed >= uploadSpeed ? downloadSpeed : uploadSpeed;

					const speed = (higherSpeed / 1000).toFixed(1);

					const symbol = downloadSpeed >= uploadSpeed ? "" : "";

					return (
						<>
							<label
								cssClasses={["label"]}
								label={speed} />
							<label
								cssClasses={["label"]}
								label="MB" />
							<label
								cssClasses={["label"]}
								label="/s"
							/>
							<label
								cssClasses={["label"]}
								label={symbol}
							/>
						</>
					);
				})}

			</box>
		</PanelButton>
	);
}
