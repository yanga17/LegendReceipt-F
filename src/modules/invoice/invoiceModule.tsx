// 'use client'

// import * as React from "react";
// import { useState, useEffect } from 'react';
// import { CheckIcon, Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';
// import { apiEndPoint } from '@/utils/colors';
// import Image from 'next/image';
// import axios from 'axios';
// import { format, parseISO } from 'date-fns';

// interface ReceiptData {
//     ID: number;
//     doc_number: string;
//     description: string;
//     incl_price: number;
//     incl_line_total: number;
//     tax: number;
//     sale_date: string;
//     store_name: string;
//     address_1: string;
//     address_2: string;
//     address_3: string;
//     address_4: string;
//     address_5: string;
//     address_6: string;
//     address_7: string;
//     customer_name: string;
//     com_logo: Buffer;
// }
// type ReceiptResponse = ReceiptData[];

// export default function InvoiceModule() {
//     const [receiptdata, setReceiptData] = useState<ReceiptResponse>([]);

//     const fetchReceiptData = async (docNum: string) => {
//         try {
//             const url = `invoice/getreceiptdata/${docNum}`;
//             const response = await axios.get<ReceiptResponse>(`${apiEndPoint}/${url}`);
//             setReceiptData(response.data);
//             console.log("Receipt response:", response);
//         } catch (error) {
//             console.error('Error fetching receipt data:', error);
//         }
//     }

//     useEffect(() => {
//         const initialDocNum = 'QNJ00011';
//         fetchReceiptData(initialDocNum);
//     }, []);

//     const totalAmount = receiptdata.reduce((sum, item) => sum + item.incl_line_total, 0);
//     const totalVAT = receiptdata.reduce((sum, item) => sum + item.tax, 0);
//     const doc_number = receiptdata[0]?.doc_number || '';
//     const sale_date = receiptdata[0] ? format(parseISO(receiptdata[0].sale_date), 'yyyy-MM-dd') : '';
//     const store_name = receiptdata[0]?.store_name || '';

//     const address = receiptdata[0] ? [
//         receiptdata[0].address_1,
//         receiptdata[0].address_2,
//         receiptdata[0].address_3,
//         receiptdata[0].address_4,
//         receiptdata[0].address_5,
//         receiptdata[0].address_6,
//     ] : [];

//     // Convert the LONGBLOB buffer to a base64 string
//     const com_logo = receiptdata[0]?.com_logo ? Buffer.from(receiptdata[0].com_logo).toString('base64') : '';

//     return (
//         <div className="min-h-screen overflow-y-auto">
//             <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
//             {com_logo && (
//                 <div className="flex justify-center mb-4">
//                     <img
//                         src={`data:image/png;base64,${com_logo}`} //indicating the image is png and Base64 encoded
//                         alt="Company Logo"
//                         width={200}
//                         height={50}
//                         className="text-center"
//                     />
//                 </div>
//             )}
//                 <h2 className="text-xl font-semibold text-center mb-4">{store_name}</h2>
//                 <div className="flex justify-center bg-white mb-6">
//                     <button>
//                         <CheckIcon size={80} strokeWidth={2} color="green" />
//                     </button>
//                 </div>

//                 <h3 className="text-center text-lg mb-6 font-bold">Payment Received</h3>

//                 <div className="text-center mb-6">
//                     <h4 className="text-sm">TAX INVOICE</h4>
//                     <p className="text-sm">
//                         Thank you for your payment of{' '}
//                         <span className="text-green">R{totalAmount.toFixed(2)}</span> on{' '}
//                         <strong>{sale_date}</strong>
//                     </p>
//                     <div className="flex items-center justify-center gap-4 pt-6 divide-x text-gray-500">
//                         <p className="mb-2 text-xs font-bold">Sale #{doc_number}</p>
//                         <p className="mb-2 text-xs font-bold pl-4">VAT Number: 4530125071</p>
//                     </div>
//                 </div>

//                 <div className="w-full mb-4 text-left">
//                     <div className="flex justify-between border-b border-gray-300 text-xs text-gray-400">
//                         <div className="py-2">DESCRIPTION</div>
//                         <div className="py-2">AMOUNT</div>
//                     </div>

//                     {receiptdata.map((item, index) => (
//                         <div key={index} className="flex flex-col py-2 text-xs">
//                             <div className="flex justify-between">
//                                 <div>
//                                     <p>{item.description}</p>
//                                 </div>
//                                 <p>R{item.incl_line_total.toFixed(2)}</p>
//                             </div>
//                             <div className="">
//                                 <p className="text-xs text-gray-500 pl-4">1 Each @ R{item.incl_price.toFixed(2)}</p>
//                             </div>
//                         </div>
//                     ))}

//                     <div className="flex justify-between pt-4">
//                         <p>Total VAT:</p>
//                         <p>R{totalVAT.toFixed(2)}</p>
//                     </div>
//                     <div className="flex justify-between">
//                         <p>Total (Incl. tax):</p>
//                         <p>R{totalAmount.toFixed(2)}</p>
//                     </div>
//                 </div>

//                 <div className="flex justify-between border-t border-gray-300 text-md font-bold">
//                     <div className="py-2">Amount Paid:</div>
//                     <div className="py-2">R{totalAmount.toFixed(2)}</div>
//                 </div>
//                 <div className="flex justify-between border-b border-gray-300 text-xs text-gray-500 py-4 font-bold uppercase">
//                     <div>Card</div>
//                     <div>Approved</div>
//                 </div>
//                 <div className="text-left text-sm pt-6 pb-2">
//                     <p>Thank you for your business</p>
//                 </div>

//                 <div className="text-left text-sm pt-4 pb-3">
//                     <p className="py-1">Contact Us:</p>
//                     <p className="py-1">011 425 3616 or 081 403 5890</p>
//                 </div>

//                 {address.length > 0 && (
//                     <div className="text-left text-sm pb-6">
//                         {address.map((line, index) => (
//                             <p key={index} className="py-0">{line}</p>
//                         ))}
//                     </div>
//                 )}

//                 <div className="bg-black text-white py-10 flex justify-between gap-4 px-6 -mx-6">
//                     <div className="w-[210px]">
//                         <p className="text-sm">Get in touch:</p>
//                         <p className="text-sm">
//                             Visit
//                             <a href="https://www.legendsystems.co.za" target="_blank" rel="noopener noreferrer" className="text-blue">
//                                 {' '}
//                                 www.legendsystems.co.za
//                             </a>
//                             ,
//                             <a href="https://api.whatsapp.com/send/" target="_blank" rel="noopener noreferrer" className="text-blue">
//                                 {' '}
//                                 Call us
//                             </a>
//                         </p>
//                         <p className="text-sm">Monday – Friday: 08:30 to 16:30</p>
//                         <p className="text-sm">Weekends: Support on call - 081 403 5890</p>
//                     </div>
//                     <div className="w-[200px] pt-4">
//                         <div className="flex flex-cols gap-4">
//                             <a href="https://www.facebook.com/LegendSystemsCC?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
//                                 <Facebook size={20} strokeWidth={2} />
//                             </a>
//                             <a href="https://x.com/Legend_Systems" target="_blank" rel="noopener noreferrer">
//                                 <Twitter size={20} strokeWidth={2} />
//                             </a>
//                             <a href="https://www.instagram.com/legendsystems?igsh=MXdkeXFxb3dsaTg3dA==" target="_blank" rel="noopener noreferrer">
//                                 <Instagram size={20} strokeWidth={2} />
//                             </a>
//                             <a href="https://youtube.com/@legendsystems3152?si=YlbxzRHSUPguGT8s" target="_blank" rel="noopener noreferrer">
//                                 <Youtube size={20} strokeWidth={2} />
//                             </a>
//                             <a href="https://www.linkedin.com/feed/update/activity:7167877737603428352" target="_blank" rel="noopener noreferrer">
//                                 <Linkedin size={20} strokeWidth={2} />
//                             </a>
//                         </div>
//                         <p className="text-sm">37 Main Road, East Leigh</p>
//                         <p className="text-sm">Edenvale</p>
//                         <p className="text-sm">Johannesburg</p>
//                         <p className="text-sm">1610</p>
//                     </div>
//                 </div>
//                 <div className="flex justify-between border-t border-gray-300 text-xs text-gray-500 py-4 font-bold uppercase">
//                     <p className="py-2 text-xs font-bold">Reference Number:</p>
//                     <p className="py-2 text-xs font-bold">ADpey2aS60nP</p>
//                 </div>
//                 <div className="flex items-center justify-center pt-6">
//                     <Image
//                         src="/covers/legendSystems.png"
//                         alt="LegendSystems"
//                         width={200}
//                         height={50}
//                         className="text-center"
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }
