import { BsXLg } from "react-icons/bs"

import { combineClasses } from "../../utils/utils"
import SocialShare from "./SocialShare"

const SocialShareModal = ({ closeModal, openShareModal = false }: any) => {
  return (
    <div
      className={combineClasses(
        "transition-all fixed h-screen w-screen flex items-center justify-center left-0 z-20 top-0",
        openShareModal
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      )}
    >
      <div
        className="absolute left-0 top-0 h-screen w-screen bg-black opacity-50"
        onClick={closeModal}
      ></div>
      <div
        className={combineClasses(
          "bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded lg:w-1/6 mx-3 w-full relative z-10 transition-all",
          openShareModal ? "top-0" : "top-10"
        )}
      >
        <div className="mb-3 flex border-b border-gray-300 pb-2">
          <p className="  w-full font-medium">Share:</p>
          <span className="pl-5" onClick={closeModal}>
            <BsXLg className="cursor-pointer pt-1 text-[18px]" />
          </span>
        </div>

        <SocialShare />
      </div>
    </div>
  )
}

export default SocialShareModal
