import { Appoinmentdata } from "@/libs/api/interface/assuarace";
import Icon, { moreIcon, view } from "@/libs/Icons";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { FC } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { assuranceAPI } from "@/libs/api/assurance";


interface PropsType {
  data: Appoinmentdata;
  updateData: () => Promise<void>;
}

export const MenuItems: FC<PropsType> = ({ data, updateData }) => {
  const downloadFileAsZip = async () => {
    const zip = new JSZip();

    const documents = [
      { url: data.medicalDocument, baseName: "medicalDocument" },
      { url: data.testDocument, baseName: "testDocument" },
    ];

    try {
      for (const doc of documents) {
        if (!doc?.url) continue;

        let urls: { url: string; name?: string }[] = [];

        if (Array.isArray(doc.url)) {
          urls = doc.url
            .map((item) => {
              if (typeof item === "string") {
                return { url: item };
              } else if (typeof item === "object" && item?.url) {
                return {
                  url: item.url,
                  name: item.documentName || doc.baseName,
                };
              }
              return null;
            })
            .filter(Boolean) as { url: string; name?: string }[];
        } else if (typeof doc.url === "string") {
          urls = [{ url: doc.url }];
        }

        for (let i = 0; i < urls.length; i++) {
          const { url, name } = urls[i];
          try {
            const corsProxy = "https://corsproxy.io/?";
            const response = await fetch(corsProxy + encodeURIComponent(url));

            if (!response.ok) continue;

            const blob = await response.blob();
            const extension = url.split(".").pop()?.split("?")[0] || "pdf";
            const fileName = `${name || doc.baseName}_${i + 1}.${extension}`;

            zip.file(fileName, blob);
          } catch (error) {
            console.error(`⚠️ Error fetching ${url}:`, error);
          }
        }
      }

      const zipBlob = await zip.generateAsync({ type: "blob" });
      const safeName = (data.policyNumber || "documents").replace(/[^\w-]/g, "_");
      saveAs(zipBlob, `${safeName}.zip`);

      // ✅ Update backend only once download succeeds
      if (!data.isDownloaded) {
        await assuranceAPI.updateDownloadedStatus(data.id);
      }


    } catch (error) {
      console.error("Error creating zip:", error);
    }
  };

  const hasTestDocument = Array.isArray(data.testDocument)
    ? data.testDocument.length > 0
    : Boolean(data.testDocument);

  const hasMedicalDocument = Array.isArray(data.medicalDocument)
    ? data.medicalDocument.length > 0
    : Boolean(data.medicalDocument);

  const isDownloadDisabled = !hasTestDocument && !hasMedicalDocument;

  return (
    <Menu placement="left">
      <MenuHandler>
        <Button
          className={`p-2 shadow-none hover:shadow-md rounded-full ${data.isDownloaded ? "bg-red-100 text-white" : "bg-transparent text-black"
            }`}
        >
          <Icon path={moreIcon} />
        </Button>

      </MenuHandler>
      <MenuList className="p-1">
        <MenuItem
          className={`hover:bg-transparent ${isDownloadDisabled
            ? "text-gray-400 cursor-not-allowed"
            : "cursor-pointer"
            }`}
          onClick={() => {
            if (isDownloadDisabled) return;
            downloadFileAsZip();
          }}
        >
          Download Document
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
