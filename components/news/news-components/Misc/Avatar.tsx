import { IAuthor } from "../../shared/interfaces"
import { combineClasses } from "../../utils/utils"
import Image from "next/image"
const Avatar = ({
  author,
  className,
}: {
  author: IAuthor
  className?: string
}) => {
  return (
    <div
      className={combineClasses(
        `flex items-center justify-center shadow-xl rounded-full overflow-hidden bg-blue-500 shrink-0`,
        className
      )}
    >
      {author.profilePic ? (
        <Image
          src={author.profilePic}
          alt={author.name}
          width={100}
          height={100}
        />
      ) : (
        <p className="text-center font-medium text-white">{author.name[0]}</p>
      )}
    </div>
  )
}

export default Avatar
