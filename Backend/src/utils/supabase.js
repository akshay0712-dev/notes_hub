import { supabase } from "../config/supabase.js";
import fs from "fs";

const uploadOnSupabase = async (localFilePath, fileName, contentType) => {
  try {
    const fileBuffer = fs.readFileSync(localFilePath);

    const { data, error } = await supabase.storage
      .from("notes")
      .upload(fileName, fileBuffer, {
        contentType,
        upsert: false,
      });

    fs.unlinkSync(localFilePath);

    if (error) throw error;

    const { data: publicUrl } = supabase.storage
      .from("notes")
      .getPublicUrl(data.path);

    return {
      secure_url: publicUrl.publicUrl,
    };
  } catch (err) {
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    console.log(err);

    return null;
  }
};

export { uploadOnSupabase };