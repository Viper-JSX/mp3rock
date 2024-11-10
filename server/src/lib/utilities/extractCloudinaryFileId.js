const extractCloudinaryFileId = (link) => {
    const id = link.split("/").pop().split(".")[0];
    console.log("Splitted: ", id);
    return id;
}

export default extractCloudinaryFileId;