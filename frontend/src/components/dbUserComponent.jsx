import { useSetRecoilState } from "recoil";

import SendMoneyModal from "./sendMoneyModal";
import { useEffect } from "react";

export function DBUserComponent({ firstName, lastName, id }) {
  return (
    <div className="flex justify-between py-2 ">
      <div className="flex pl-6 px-3 py-1.5">
        <div className="relative w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-gray-600 text-sm font-semibold">
            {firstName.charAt(0).toUpperCase()}
          </span>
        </div>

        <div className="ml-2 flex items-center justify-center">
          {firstName} {lastName}
        </div>
      </div>
      <div className="pr-6 flex items-center  justify-center">
        <SendMoneyModal id={id} firstName={firstName} lastName={lastName} />
      </div>
    </div>
  );
}
